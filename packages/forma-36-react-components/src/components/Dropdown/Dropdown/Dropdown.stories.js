import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, selectV2 } from '@storybook/addon-knobs/react';
import { host } from 'storybook-host';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';

import Dropdown from './Dropdown';
import DropdownListItem from '../DropdownListItem';
import Button from '../../Button';
import TextLink from '../../TextLink';
import DropdownList from '../DropdownList';

storiesOf('Components|Dropdown', module)
  .addDecorator(
    host({
      align: 'center middle',
      cropMarks: false,
    }),
  )
  .add(
    'default',
    withState({ isOpen: false }, store =>
      withInfo()(() => (
        <Dropdown
          isOpen={store.state.isOpen}
          onClose={() => store.set({ isOpen: false })}
          position={selectV2(
            'Menu Position',
            {
              'bottom-left': 'bottom-left',
              'bottom-right': 'bottom-right',
              'top-left': 'top-left',
              'top-right': 'top-right',
            },
            'bottom-left',
          )}
          toggleElement={
            <Button
              size="small"
              buttonType="muted"
              indicateDropdown
              onClick={() => store.set({ isOpen: !store.state.isOpen })}
            >
              toggle
            </Button>
          }
          extraClassNames={text('Extra Class Names', '')}
        >
          <DropdownList>
            <DropdownListItem isTitle>Entry Title</DropdownListItem>
            <DropdownListItem onClick={action('onClick Element')}>
              Embed existing entry
            </DropdownListItem>
            <Dropdown
              position={selectV2(
                'Submenu Position',
                {
                  left: 'left',
                  right: 'right',
                },
                'right',
              )}
              submenuToggleLabel="Create and embed existing entry"
              extraClassNames={text('Extra Class Names', '')}
            >
              <DropdownList>
                <DropdownListItem onClick={action('submenu click')}>
                  Embed as inline element
                </DropdownListItem>
                <DropdownListItem isDisabled>
                  Embed as block element
                </DropdownListItem>
              </DropdownList>
            </Dropdown>
          </DropdownList>
          <DropdownList border="top">
            <DropdownListItem>
              <TextLink href="http://google.com">This is a Link</TextLink>
            </DropdownListItem>
          </DropdownList>
        </Dropdown>
      )),
    ),
  )
  .add(
    'scrollable',
    withState({ isOpen: false }, store =>
      withInfo()(() => (
        <Dropdown
          isOpen={store.state.isOpen}
          onClose={() => store.set({ isOpen: false })}
          position={selectV2(
            'Menu Position',
            {
              'bottom-left': 'bottom-left',
              'bottom-right': 'bottom-right',
              'top-left': 'top-left',
              'top-right': 'top-right',
            },
            'bottom-left',
          )}
          toggleElement={
            <Button
              size="small"
              buttonType="muted"
              indicateDropdown
              onClick={() => store.set({ isOpen: !store.state.isOpen })}
            >
              toggle
            </Button>
          }
          extraClassNames={text('Extra Class Names', '')}
        >
          <DropdownList maxHeight={200} title="List Title">
            {[...new Array(25)].map((entry, index) => (
              // eslint-disable-next-line
              <DropdownListItem key={`key-${index}`} onClick={action('click')}>
                Entry Item {index}
              </DropdownListItem>
            ))}
          </DropdownList>
        </Dropdown>
      )),
    ),
  );