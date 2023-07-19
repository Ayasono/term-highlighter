<script setup>
import { NSpace, NTable } from 'naive-ui'
import { computed, ref } from 'vue'
import { leftTxt, rightTxt, similarTerms, explainerLeft, explainerRight } from '../mock/index.js'

let explainerStrLeft = ref("")
let explainerStrRight = ref("")

const pairTxtHighlighted = computed(() => {
	let left = leftTxt
	let right = rightTxt
	let counter = 1

	for (const similarTerm of similarTerms) {
		// get a random color
		const color = randomBrightColor()
		let leftKeys = Object.keys(similarTerm)[0]
		let rightKeys = similarTerm[leftKeys]

		left = left.replace(leftKeys, `<span style='background-color: ${color}; border-radius: 3px' data-explain='${leftKeys}'>${leftKeys}</span>`)

		right = right.replace(rightKeys, `<span style='background-color: ${color}; border-radius: 3px' data-explain='${rightKeys}'>${rightKeys}</span>`)

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
			const rightKey = similarTerms.find(item => item[key])[key]
			explainerStrRight.value = explainerRight[rightKey]
		} else if (key in explainerRight) {
			explainerStrRight.value = explainerRight[key]
			const leftKey = Object.keys(similarTerms.find(item => Object.values(item)[0] === key))[0]
			explainerStrLeft.value = explainerLeft[leftKey]
		} else {
			console.error('No explainer found')
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

</script>

<template>
	<NSpace justify='center'>
		<NTable size='large'
		        :bordered='false'
		        :single-line='false'
		        :striped='true'
		        class='table'>
			<thead>
			<tr>
				<th>Claim 25</th>
				<th>Relevant text from 3GPP standard(s)</th>
			</tr>
			</thead>

			<tbody>
			<tr style='white-space: pre-line;'>
				<td v-html='pairTxtHighlighted.left'
				    @click='handleClick'>
				</td>

				<td v-html='pairTxtHighlighted.right'
				    @click='handleClick'>
				</td>
			</tr>
			<tr>
				<td :style='{width: "50%"}'>
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
