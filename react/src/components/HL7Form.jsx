import { useState } from "react"
import { initHL7, sampleADT } from "../utilities/Hl7Functions";
import * as HL7Functions from "../utilities/Hl7Functions";
import { Results } from "./Results";

const buttonClass = "bg-blue-600 rounded-lg p-2 w-40 hover:bg-blue-500 font-semibold";

export function HL7Form() {
	const [hl7Text, setHl7Text] = useState('');
	const [hl7Object, setHl7Object] = useState({});

	let hl7Data = initHL7;

	function handleClear() {
		setHl7Text('');
		setHl7Object({});
		setView('');
	}

	function handleTextChange(event) {
		setHl7Text(event.target.value);
	}

	function handleSample() {
		setHl7Text(sampleADT);
	}

	function handleParse() {
		hl7Data.data = {};
		if (!hl7Text || hl7Text === '') {
			return;
		}
		if (hl7Text.substring(0,3) !== 'MSH') {
			return;
		}
		const separatorCodes = hl7Text.substring(3,8);
		let segments = [];
		segments = HL7Functions.getValidSegments(hl7Text.split(/\r?\n/));
		for (const segment of segments) {
			let segmentSplit = segment.split(hl7Data.separators.field);
			const segmentType = segmentSplit[0];
			if (!hl7Data.segments.includes(segmentType)) {
				hl7Data.segments.push(segmentType);
			}
			for (let i = 0; i < segmentSplit.length; i++) {
				segmentSplit[i] = segmentSplit[i].split(hl7Data.separators.component);
			}
			if (segmentType.length === 3 && !hl7Data.data[segmentType]) {
				hl7Data.data[segmentType] = [];
			}
			if (hl7Data.data[segmentType]) {
				hl7Data.data[segmentType].push(segmentSplit);
			}
		}

		if (hl7Data.data.MSH) {
			hl7Data.type = hl7Data.data.MSH[0][8][0];
			hl7Data.event = hl7Data.data.MSH[0][8][1];
		}

		setHl7Object({...hl7Data});
		setView('parse')
	}

	return (
		<div className='p-1 grid'>
			<textarea onChange={handleTextChange} value={hl7Text} id="hl7Text" rows="15" className="relative p-2 resize text-white bg-stone-700 w-full rounded-lg placeholder:text-gray-300 placeholder:italic" placeholder="HL7 message here..."></textarea>
			<menu className="flex-grid space-x-8 mt-5 mb-5">
				<button onClick={handleClear} className={buttonClass}>Clear</button>
				<button onClick={handleSample} className={buttonClass}>Fill Sample ADT</button>
				<button onClick={() => {navigator.clipboard.writeText(hl7Text)}} className={buttonClass}>Copy Message</button>
				<button onClick={handleParse} className={buttonClass}>Parse</button>
			</menu>			
			<Results hl7Object={hl7Object}/>
		</div>
	)
}