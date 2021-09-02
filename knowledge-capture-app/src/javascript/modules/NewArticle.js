import React, { useState } from 'react';
import styled from 'styled-components';
import i18n from '../lib/i18n';

export default function NewArticle() {
	return <h3>{i18n.t('create knowledge')}</h3>;
}
