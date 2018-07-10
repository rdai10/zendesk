import preact from 'preact';

export default function preactRenderer(Component, props = {}, containerNode, replaceNode) {
	return preact.render(<Component {...props} />, containerNode, replaceNode);
}