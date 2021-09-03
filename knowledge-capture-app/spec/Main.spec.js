import { cleanup, fireEvent, getByText, render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { CLIENT } from './mocks/mock';
import { GlobalContext } from '../src/javascript/context/Global';
import Main from '../src/javascript/modules/Main';
import { Theme } from '../src/javascript/modules/Theme';

function renderMain() {
	return render(
		<GlobalContext.Provider value={{ client: CLIENT }}>
			<ThemeProvider theme={Theme}>
				<Main data={{ ticketSubject: 'Test subject' }} />
			</ThemeProvider>
		</GlobalContext.Provider>
	);
}

describe('Main', () => {
	afterEach(cleanup);

	describe('workflow to display no search results page', () => {
		it('displays page correctly when user searches with empty string', () => {
			const { getAllByDisplayValue, getByDisplayValue, getByText } =
				renderMain();

			fireEvent.change(getByDisplayValue('Test subject'), {
				target: { value: '' },
			});
			fireEvent.keyDown(getAllByDisplayValue('')[0], { keyCode: 13 });

			getByText('No search results available.');
			getByText('Create new knowledge.');
		});
	});

	describe('workflow to display new article page', () => {
		it('displays the page correctly when user clicks on the + button', () => {
			const { getByText } = renderMain();

			fireEvent.click(getByText('+'));

			getByText('Create Knowledge');
		});

		it('displays the page correctly when user clicks on the "Create new knowledge" link on the no results page', () => {
			const { getAllByDisplayValue, getByDisplayValue, getByText } =
				renderMain();

			fireEvent.change(getByDisplayValue('Test subject'), {
				target: { value: '' },
			});
			fireEvent.keyDown(getAllByDisplayValue('')[0], { keyCode: 13 });
			fireEvent.click(getByText('Create new knowledge.'));

			getByText('Create Knowledge');
		});
	});

	describe('workflow to return to previous page from new article page', () => {
		it('returns to the no results page correctly', () => {
			const { getAllByDisplayValue, getByDisplayValue, getByText } =
				renderMain();

			fireEvent.change(getByDisplayValue('Test subject'), {
				target: { value: '' },
			});
			fireEvent.keyDown(getAllByDisplayValue('')[0], { keyCode: 13 });
			fireEvent.click(getByText('Create new knowledge.'));

			fireEvent.click(getByText('X'));

			getByText('No search results available.');
			getByText('Create new knowledge.');
		});

		it('returns to the main search results page correctly', () => {
			const { getByText } = renderMain();

			fireEvent.click(getByText('+'));

			fireEvent.click(getByText('X'));

			getByText('Language Selector');
		});
	});
});
