import { useState } from "react"

export function Results({ hl7Object }) {
	if ( !hl7Object.data ) {
		return <></>
	}

	const [segment, setSegment] = useState('MSH');
	const [segData, setSegData] = useState(hl7Object.data.MSH);

	const eventLink = "https://hl7-definition.caristix.com/v2/HL7v2.5.1/TriggerEvents/" + hl7Object.type+ "_" + hl7Object.event;
	const segmentLink = "https://hl7-definition.caristix.com/v2/HL7v2.5.1/Segments/" + segment;

	function handleSelect(event) {
		setSegment(event.target.value)
		if (hl7Object.data[event.target.value]) {
			setSegData(hl7Object.data[event.target.value]);
		}
	}

	function displayMSH10() {
		if (hl7Object.data.PID) {
			return <p>Message Control Id: {hl7Object.data.MSH[0][9]}</p>
		}
	}

	return (
		<>
			<p>Type: <a href={eventLink} className="text-blue-500 hover:text-blue-400" target="_blank">{hl7Object.type}</a></p>
			<p>Event: {hl7Object.event}</p>
			{displayMSH10()}
			<div className="space-x-3 flex items-center mt-5">
				<select className="w-min rounded-md p-1" onChange={handleSelect} value={segment}>
					{
						hl7Object.segments.map(
							(seg) => <option key={seg} value={seg}>{seg}</option>)
					}
				</select>
				<form action={segmentLink} target="_blank">
					<button type="submit" className="bg-blue-500 rounded-md p-1 text-xs">2.5.1 Doc</button>
				</form>
			</div>
			<table className="table-auto mt-2">
				<thead>
					<tr>
						<th className="text-left w-20">
							Field
						</th>
						<th className="text-left">
							Value
						</th>
					</tr>
				</thead>
				<tbody>
					{segData.map((repeats) => {
						let i = 0;
						if (segment === 'MSH') {
							i = 1;
						}
						return (
							repeats.map((field) => {
								return (
									<tr key={i + JSON.stringify(field)}>
										<td>
											{i++}
										</td>
										<td>
											{field.join('^')}
										</td>
									</tr>
								)
							})
						)
					})}
				</tbody>
			</table>

		</>
	)
}