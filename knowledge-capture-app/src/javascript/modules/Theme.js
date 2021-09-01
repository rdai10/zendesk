import { DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { css } from 'styled-components';

export const Theme = {
	...DEFAULT_THEME,
	components: {
		'forms.input_group': css`
			button {
				border-left: 0;
			}

			input {
				border-right: 0;
			}
		`,
		'notifications.well': css`
			color: ${DEFAULT_THEME.palette.grey[800]};
			margin-bottom: ${DEFAULT_THEME.space.xs};
			padding: ${DEFAULT_THEME.space.xs} ${DEFAULT_THEME.space.sm};

			&:hover {
				background: ${DEFAULT_THEME.palette.grey[100]};
				cursor: pointer;
			}
		`,
	},
};
