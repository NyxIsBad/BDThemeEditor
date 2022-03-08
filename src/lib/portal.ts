// Code from: https://github.com/romkor/svelte-portal/blob/master/src/Portal.svelte

import {tick} from 'svelte';

export default function portal(el: HTMLElement, target: HTMLElement|string = "body") {
	let targetEl: Element;
	const update = async(newTarget: HTMLElement|string) => {
		target = newTarget;
		if (typeof target === "string") {
			targetEl = document.querySelector(target);
			if (targetEl === null) {
				await tick();
				targetEl = document.querySelector(target);
			}
			if (targetEl === null) {
				throw new Error(`No element found matching css selector: "${target}"`);
			}
		} else if (target instanceof HTMLElement) {
			targetEl = target;
		}
		targetEl.appendChild(el);
		el.hidden = false;
	}
	const destroy = () => {
		if (el.parentNode) {
			el.parentNode.removeChild(el);
		}
	}
	update(target);

	return {update, destroy};
}