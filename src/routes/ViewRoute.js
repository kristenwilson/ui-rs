import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { stripesConnect } from '@folio/stripes/core';
import { Button, ButtonGroup, Icon, IconButton, Layout, Pane, PaneMenu, Paneset } from '@folio/stripes/components';

import { Tags } from '@folio/stripes-erm-components';
import { ChatPane } from '../components/chat';

import { ContextualMessageBanner, MessageModalProvider } from '../components/MessageModalState';
import css from './ViewRoute.css';


const subheading = (req, params) => {
  if (!req || params.id !== req.id) return undefined;
  const title = _.get(req, 'title');
  if (!title) return undefined;
  const requester = _.get(req, 'resolvedRequester.owner.slug', '');
  if (!requester) return title;
  const supplier = _.get(req, 'resolvedSupplier.owner.slug', '');
  return `${title} · ${requester} → ${supplier}`;
};

const handleToggleHelper = (helper, mutator, resources) => {
  const currentHelper = _.get(resources, 'query.helper', null);
  const nextHelper = currentHelper !== helper ? helper : null;

  mutator.query.update({ helper: nextHelper });
};

const handleToggleTags = (mutator, resources) => {
  handleToggleHelper('tags', mutator, resources);
};

const handleToggleChat = (mutator, resources) => {
  handleToggleHelper('chat', mutator, resources);
};

const paneButtons = (mutator, resources) => {
  let listOfUnseenNotifications = _.get(resources, 'selectedRecord.records[0].notifications');
  listOfUnseenNotifications = listOfUnseenNotifications ? listOfUnseenNotifications.filter(notification => notification.seen === false && notification.isSender === false) : null;
  return (
    <PaneMenu>
      {handleToggleTags &&
      <FormattedMessage id="ui-rs.view.showChat">
        {ariaLabel => (
          <IconButton
            icon="comment"
            id="clickable-show-chat"
            badgeCount={listOfUnseenNotifications ? listOfUnseenNotifications.length : 0}
            onClick={() => handleToggleChat(mutator, resources)}
            ariaLabel={ariaLabel}
          />
        )}
      </FormattedMessage>
      }
      {handleToggleChat &&
      <FormattedMessage id="ui-rs.view.showTags">
        {ariaLabel => (
          <IconButton
            icon="tag"
            id="clickable-show-tags"
            badgeCount={_.get(resources, 'selectedRecord.records[0].tags.length', 0)}
            onClick={() => handleToggleTags(mutator, resources)}
            ariaLabel={ariaLabel}
          />
        )}
      </FormattedMessage>
      }
    </PaneMenu>
  );
};

const getHelperApp = (match, resources, mutator) => {
  const helper = _.get(resources, 'query.helper', null);
  if (!helper) return null;

  let HelperComponent = null;

  if (helper === 'tags') HelperComponent = Tags;
  if (helper === 'chat') HelperComponent = ChatPane;

  if (!HelperComponent) return null;

  const extraProps = { mutator, resources };
  return (
    <HelperComponent
      link={`rs/patronrequests/${match.params.id}`}
      onToggle={() => handleToggleHelper(helper, mutator, resources)}
      {... extraProps}
    />
  );
};

const ViewRoute = ({ children, history, resources, location: { pathname }, match, mutator }) => {
  return (
    <MessageModalProvider>
      <Paneset>
        {/* TODO: The "Request" string is translated as ui-rs.view.title which we can use conveniently with a hook once react-intl is upgraded */}
        <Pane
          paneTitle={`Request ${_.get(resources, 'selectedRecord.records[0].hrid')}`}
          paneSub={subheading(_.get(resources, 'selectedRecord.records[0]'), match.params)}
          padContent={false}
          onClose={() => history.push('../../..')}
          dismissible
          lastMenu={paneButtons(mutator, resources)}
          defaultWidth="fill"
          subheader={
            <Layout
              className={`${css.tabContainer} flex centerContent flex-align-items-center full padding-start-gutter padding-end-gutter`}
            >
              <ButtonGroup>
                <Button
                  marginBottom0
                  to={`${match.url}/flow`}
                  buttonStyle={pathname.includes('/flow') ? 'primary' : 'default'}
                  replace
                >
                  <FormattedMessage id="ui-rs.flow.flow" />
                </Button>
                <Button
                  marginBottom0
                  to={`${match.url}/details`}
                  buttonStyle={pathname.includes('/details') ? 'primary' : 'default'}
                  replace
                >
                  <FormattedMessage id="ui-rs.flow.details" />
                </Button>
              </ButtonGroup>
            </Layout>
          }
          actionMenu={() => (
            <React.Fragment>
              <Button buttonStyle="dropdownItem" to={`../../edit/${match.params.id}`} id="clickable-edit-patronrequest">
                <Icon icon="edit">
                  <FormattedMessage id="ui-rs.edit" />
                </Icon>
              </Button>
              <Button buttonStyle="dropdownItem" to="pullslip" id="clickable-pullslip">
                <Icon icon="print">
                  <FormattedMessage id="ui-rs.printPullslip" />
                </Icon>
              </Button>
            </React.Fragment>
          )}
        >
          <ContextualMessageBanner />
          <div>{children}</div>
        </Pane>
        {getHelperApp(match, resources, mutator)}
      </Paneset>
    </MessageModalProvider>
  );
};

ViewRoute.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
    url: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
};

ViewRoute.manifest = {
  selectedRecord: {
    type: 'okapi',
    path: 'rs/patronrequests/:{id}',
    fetch: false,
  },
  tagsValues: {
    type: 'okapi',
    path: 'tags',
    params: {
      limit: '1000',
      query: 'cql.allRecords=1 sortby label',
    },
  },
  action: {
    type: 'okapi',
    path: 'rs/patronrequests/:{id}/performAction',
    fetch: false,
    clientGeneratePk: false,
  },
  query: {},
};

export default stripesConnect(ViewRoute);
