import LabelWithHoverPopup from './LabelWithHoverPopup';

export function Header() {
	return (
		<>
			<header className="text-blue-400 text-5xl text-left p-1 mr-3 flex space-x-6">
				<h1>HL7 Parser</h1>
				<LabelWithHoverPopup 
					label="Info" 
					popupText="This parser does not store or transmit parsed data in any way. 
					As such, the web application functions like an offline app: 
					all data in the browser's local memory is cleared when the tab is closed or the 'Clear' button is clicked. 
					If you have any concerns about the privacy of your data, please consult your HIPAA advisor." />
			</header>
		</>
	) 
}