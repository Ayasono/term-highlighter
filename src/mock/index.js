let leftTxt = "A method comprising: \n selecting a multimedia presentation to be transmitted from a sending communication device to a receiving communication device"

let rightTxt = "4 System description \n" +
	"The control related elements are session establishment, capability exchange and session control (see clause 5). \n" +
	"- Session establishment refers to methods to invoke a PSS session from a browser or directly by entering an URL in the terminal's user interface.\n" +
	"- Capability exchange enables choice or adaptation of media streams depending on different terminal capabilities. \n" +
	"- Session control deals with the set-up of the individual media streams between a PSS client and one or several PSS servers.It also enables control of the individual media streams by the user. It may involve VCR-like presentation control functions like start, pause, fast forward and stop of a media presentation."

const similarTerms = [{ "multimedia presentation": "media streams" }, { "sending communication device": "PSS client" }, { "receiving communication device": "PSS server" }]

const explainerLeft = {
	"multimedia presentation": "A collection of various forms of media, such as audio, video, and images, combined into a cohesive presentation. It includes content that can be transmitted and viewed on a wireless communication device, such as a smartphone or tablet. The multimedia presentation can be requested and transmitted from a sending communication device to a receiving communication device via a wireless communication network. The purpose is to allow the user of the receiving communication device to watch or consume the multimedia presentation with the desired quality and accuracy.",
	"sending communication device": "A device that is responsible for transmitting a selected multimedia stream from the sender to the receiver. This device comprises a selector to choose the multimedia stream to be transmitted and a transmitter to communicate and exchange information with the sending communication device and receiving communication device. Additionally, the sending communication device may also include a transmitter to provide information on the granted network resources, which may include parameters related to the transmission process.",
	"receiving communication device": "Based on the patent's description and claim, the scope of the \"receiving communication device\" includes any communication device that is capable of receiving multimedia streams, performing the specified actions, and participating in the transmission and reservation of resources for the selected multimedia presentation."
}

const explainerRight = {
	"media streams": "Media streams refer to synchronized audio and video streams that are continuously transmitted over a data network to a client application. These streams are described in a presentation description, including details such as encodings, network addresses, and content information. Capability exchange allows for the selection or modification of media streams based on the capabilities of the terminal. Session control facilitates the setup of individual media streams between a PSS client and one or multiple PSS servers, enabling user control functions like start, pause, fast forward, and stop. For continuous media streaming using RTP/UDP/IP, a session control protocol is required, whereas for discrete media, HTTP/TCP/IP is used. The target protection time, indicated by the \"target-time\" parameter, represents the desired minimum buffer level in milliseconds to ensure uninterrupted playback. Additional resources can be utilized to enhance media quality or extend the buffer duration beyond the target-time.",
	"PSS client": "client for the 3GPP packet switched streaming service based on the IETF RTSP/SDP and/or HTTP standards, with possible additional 3GPP requirements according to the present document.",
	"PSS server": "server for the 3GPP packet switched streaming service based on the IETF RTSP/SDP and/or HTTP standards, with possible additional 3GPP requirements according to the present document",
}

export {
	leftTxt,
	rightTxt,
	similarTerms,
	explainerLeft,
	explainerRight
}
