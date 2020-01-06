import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number, object, text } from '@storybook/addon-knobs';

import Autocomplete from './Autocomplete';

interface Item {
  value: number;
  label: string;
}

const items: Item[] = [
  { value: 1, label: 'entry foo' },
  { value: 2, label: 'entry bar' },
  { value: 3, label: 'entry baz' },
  { value: 4, label: 'entry fooBar' },
  { value: 5, label: 'entry out of viewport' },
];

const AutocompleteDefaultStory = ({ items }: { items: Item[] }) => {
  const [filteredItems, setFilteredItems] = useState(items);

  const handleQueryChange = useCallback((query: string) => {
    setFilteredItems(
      query ? items.filter(item => item.label.includes(query)) : items,
    );
  }, []);

  return (
    <Autocomplete
      maxHeight={number('maxHeight', 100)}
      items={filteredItems}
      onQueryChange={handleQueryChange}
      onChange={action('onChange')}
      placeholder={text(
        'placeholder',
        'Choose from spaces in your organization',
      )}
      isLoading={boolean('isLoading', false)}
      width="large"
      disabled={boolean('disabled', false)}
      emptyListMessage={text(
        'emptyListMessage',
        'There are no items to choose from',
      )}
      noMatchesMessage={text('noMatchesMessage', 'No matches')}
      isFullWidth={boolean('isFullWidth', true)}
    >
      {(options: Item[]) =>
        options.map((option: Item) => (
          <span key={option.value}>{option.label}</span>
        ))
      }
    </Autocomplete>
  );
};

storiesOf('Components|Autocomplete', module)
  .addParameters({
    propTypes: Autocomplete['__docgenInfo'],
  })
  .add('default', () => (
    <AutocompleteDefaultStory items={object('items', items)} />
  ));