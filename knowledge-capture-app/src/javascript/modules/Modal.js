import React, { useState } from 'react';

export default function Modal({ data }) {
	console.log(data);
	return <div dangerouslySetInnerHTML={{ __html: data.body }} />;
}
