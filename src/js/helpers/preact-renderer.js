import preact from 'preact';

export default function preactRenderer(Component, containerNode, replaceNode) {
	return preact.render(<Component />, containerNode, replaceNode);
}