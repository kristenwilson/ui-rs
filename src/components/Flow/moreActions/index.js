import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Icon } from '@folio/stripes/components';
import { ShowModalButton } from '../../ModalButtons';
import ActionButton from '../ActionButton';

export const RequesterReceived = () => (
  <ShowModalButton buttonStyle="dropdownItem" modal="RequesterReceived">
    <Icon icon="times-circle-solid"><FormattedMessage id="ui-rs.actions.markReceivedWithoutScan" /></Icon>
  </ShowModalButton>
);

export const PatronReturnedItem = props => <ActionButton
  action="patronReturnedItem"
  label="ui-rs.actions.markReturnedWithoutScan"
  success="ui-rs.actions.markReturned.success"
  error="ui-rs.actions.markReturned.error"
  {...props}
/>;

export const ShippedReturn = props => <ActionButton
  action="shippedReturn"
  label="ui-rs.actions.markShippedReturnWithoutScan"
  success="ui-rs.actions.markShippedReturn.success"
  error="ui-rs.actions.markShippedReturn.error"
  {...props}
/>;

export const SupplierCheckOutOfReshare = props => <ActionButton
  action="supplierCheckOutOfReshare"
  label="ui-rs.actions.checkOutWithoutScan"
  icon="print"
  success="ui-rs.actions.checkOut.success"
  error="ui-rs.actions.checkOut.error"
  {...props}
/>;

export const SupplierMarkPullSlipPrinted = props => <ActionButton
  action="supplierPrintPullSlip"
  label="ui-rs.actions.markSlipPrinted"
  icon="print"
  success="ui-rs.actions.markSlipPrinted.success"
  error="ui-rs.actions.markSlipPrinted.error"
  {...props}
/>;

export const SupplierMarkShipped = props => <ActionButton
  action="supplierMarkShipped"
  label="ui-rs.actions.markShippedWithoutScan"
  icon="archive"
  success="ui-rs.actions.markShipped.success"
  error="ui-rs.actions.markShipped.error"
  {...props}
/>;


// We can't automate the process of checking out the item from the host institution LMS,
// this action allows a user to manually mark the item as checked out (Probably by manually
// issuing the item). It also allows developers to progress the request even if they don't really
// have a host LMS to talk NCIP to
export const ManualCheckout = props => <ActionButton
  action="supplierManualCheckout"
  label="ui-rs.actions.supplierManualCheckout"
  icon="archive"
  success="ui-rs.actions.supplierManualCheckout.success"
  error="ui-rs.actions.supplierManualCheckout.error"
  {...props}
/>;

export const CannotSupply = () => (
  <ShowModalButton buttonStyle="dropdownItem" modal="CannotSupply">
    <Icon icon="times-circle-solid"><FormattedMessage id="ui-rs.actions.cannotSupply" /></Icon>
  </ShowModalButton>
);

export const RespondYes = () => (
  <ShowModalButton buttonStyle="dropdownItem" modal="RespondYes">
    <Icon icon="times-circle-solid"><FormattedMessage id="ui-rs.actions.respondYes" /></Icon>
  </ShowModalButton>
);

export const SendChatMessage = () => (
  <ShowModalButton buttonStyle="dropdownItem" modal="SendChatMessage">
    <Icon icon="times-circle-solid"><FormattedMessage id="ui-rs.actions.sendChatMessage" /></Icon>
  </ShowModalButton>
);

// Alternatives to primaryActions for display in dropdowns
export const PrintPullSlip = () => <Button buttonStyle="dropdownItem" to="pullslip"><Icon icon="print">Print pull slip</Icon></Button>;
