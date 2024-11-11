export const initHL7 = {
	separators : {
		field: "|",
		component: "^",
		subcomponent: "&",
		repetition: "~"
	},
	segments: [],
	type: "",
	event:"",
	datetime:"",
	pid: "",
	data: {}

};

export const sampleADT = `MSH|^~\&|MESA_ADT|XYZ_ADMITTING|iFW|ZYX_HOSPITAL|||ADT^A04|103102|P|2.4||||||||
EVN||200007010800||||200007010800
PID|||583295^^^ADT1||DOE^JANE||19610615|M-||2106-3|123 MAIN STREET^^GREENSBORO^NC^27401-1020|GL|(919)379-1212|(919)271-3434~(919)277-3114||S||PATID12345001^2^M10|123456789|9-87654^NC
NK1|1|BATES^RONALD^L|SPO|||||20011105
PV1||E||||||5101^NELL^FREDERICK^P^^DR|||||||||||V1295^^^ADT1|||||||||||||||||||||||||200007010800||||||||
PV2|||^ABDOMINAL PAIN
OBX|1|HD|SR Instance UID||1.123456.2.2000.31.2.1||||||F||||||
AL1|1||^PENICILLIN||PRODUCES HIVES~RASH
AL1|2||^CAT DANDER
DG1|001|I9|1550|MAL NEO LIVER, PRIMARY|19880501103005|F||
PR1|2234|M11|111^CODE151|COMMON PROCEDURES|198809081123
ROL|45^RECORDER^ROLE MASTER LIST|AD|CP|KATE^SMITH^ELLEN|199505011201
GT1|1122|1519|BILL^GATES^A
IN1|001|A357|1234|BCMD|||||132987
IN2|ID1551001|SSN12345678`;

export function getValidSegments(hl7Segmented)  {
	hl7Segmented = hl7Segmented.filter((segment) => {
		if (segment === '') {
			return false;
		}
		if (segment[3] !== "|") {
			return false;
		}
		return true;
	})
	return hl7Segmented;
}

export function toString(segment) {
	let message = '';
	let lines = [];
	let newFields = [];
	for (const repeats in segment){
		for (const fields in segment[repeats]) {
			newFields.push(segment[repeats][fields].join('^'));
		}
		lines.push(newFields.join('|'));
	}
	message = lines.join('\r\n');
	console.log(message);
	return message;
}