<script setup>
import { NSpace, NTable } from 'naive-ui'
import { computed, reactive, ref } from 'vue'

let leftTxt = "A method comprising: \n selecting a multimedia presentation to be transmitted from a sending communication device to a receiving communication device"

let rightTxt = "4 System description \n" +
	"The control related elements are session establishment, capability exchange and session control (see clause 5). \n" +
	"- Session establishment refers to methods to invoke a PSS session from a browser or directly by entering an URL in the terminal's user interface.\n" +
	"- Capability exchange enables choice or adaptation of media streams depending on different terminal capabilities. \n" +
	"- Session control deals with the set-up of the individual media streams between a PSS client and one or several PSS servers.It also enables control of the individual media streams by the user. It may involve VCR-like presentation control functions like start, pause, fast forward and stop of a media presentation."

const terms = {
	"a multimedia presentation": "media stream",
	"sending communication device": "PSS servers",
	"a receiving communication device": "PSS client",
}

let explainerLeft = reactive({})
let explainerRight = reactive({})
let explainerStrLeft = ref("")
let explainerStrRight = ref("")

initExplainers()

const pairTxtHighlighted = computed(() => {
	let left = leftTxt
	let right = rightTxt
	let counter = 1

	for (const [leftKeys, rightKeys] of Object.entries(terms)) {
		// get a random color
		const color = randomBrightColor()

		left = left.replaceAll(leftKeys, `<span style='background-color: ${color}; border-radius: 3px' data-explain='${leftKeys}'>${leftKeys}</span>`)

		right = right.replaceAll(rightKeys, `<span style='background-color: ${color}; border-radius: 3px' data-explain='${rightKeys}'>${rightKeys}</span>`)

		counter ++
	}

	return { left, right }
})

function handleClick ($e) {
	if ($e.target.tagName === 'SPAN') {
		// 可能是左边的，也可能是右边的
		const key = $e.target.dataset.explain

		if (key in explainerLeft) {
			// 左边的, 同时找到右边的
			explainerStrLeft.value = explainerLeft[key]
			const rightKey = terms[key]
			explainerStrRight.value = explainerRight[rightKey]
		} else if (key in explainerRight) {
			explainerStrRight.value = explainerRight[key]
			const leftKey = Object.keys(terms).find(k => terms[k] === key)
			explainerStrLeft.value = explainerLeft[leftKey]
		} else {
			console.log('No explainer found')
		}
	}
}

function randomBrightColor () {
	let r, g, b

	do {
		r = Math.floor(Math.random() * 255)
		g = Math.floor(Math.random() * 255)
		b = Math.floor(Math.random() * 255)
	} while (r + g + b < 384) // 确保颜色相对明亮，总和大于 384

	return `rgb(${r}, ${g}, ${b})`
}

function initExplainers () {
	let counter = 1
	for (const [leftKeys, rightKeys] of Object.entries(terms)) {
		explainerLeft[leftKeys] = `This is the #${counter} explanation for ${leftKeys}`
		explainerRight[rightKeys] = `This is the #${counter} explanation for ${rightKeys}`
		counter ++
	}
}

</script>

<template>
	<NSpace justify='center'>
		<NTable size='large'
		        :bordered='false'
		        :single-line='false'
		        class='table'>
			<thead>
			<tr>
				<th>Claim 25</th>
				<th>Relevant text from 3GPP standard(s)</th>
			</tr>
			</thead>

			<tbody>
			<tr style='white-space: pre-line'>
				<td v-html='pairTxtHighlighted.left'
				    @click='handleClick'>
				</td>

				<td v-html='pairTxtHighlighted.right'
				    @click='handleClick'>
				</td>
			</tr>
			<tr>
				<td>
					{{ explainerStrLeft ? explainerStrLeft : 'Click on a highlighted term to see the explanation' }}
				</td>

				<td>
					{{ explainerStrRight ? explainerStrRight : 'Click on a highlighted term to see the explanation' }}
				</td>
			</tr>
			</tbody>
		</NTable>
	</NSpace>
</template>
