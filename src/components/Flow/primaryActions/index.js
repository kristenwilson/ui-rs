import React from 'react';
import { Button } from '@folio/stripes/components';
import ScanConfirmAction from '../ScanConfirmAction';

export const RequesterReceived = props => <ScanConfirmAction
  action="requesterReceived"
  prompt="ui-rs.actions.markReceived.prompt"
  success="ui-rs.actions.markReceived.success"
  error="ui-rs.actions.markReceived.error"
  {...props}
/>;

export const PatronReturnedItem = props => <ScanConfirmAction
  action="patronReturnedItem"
  prompt="ui-rs.actions.markReturned.prompt"
  success="ui-rs.actions.markReturned.success"
  error="ui-rs.actions.markReturned.error"
  {...props}
/>;

export const ShippedReturn = props => <ScanConfirmAction
  action="shippedReturn"
  prompt="ui-rs.actions.markShippedReturn.prompt"
  success="ui-rs.actions.markShippedReturn.success"
  error="ui-rs.actions.markShippedReturn.error"
  {...props}
/>;

export const SupplierCheckOutOfReshare = props => <ScanConfirmAction
  action="supplierCheckOutOfReshare"
  prompt="ui-rs.actions.checkOut.prompt"
  success="ui-rs.actions.checkOut.success"
  error="ui-rs.actions.checkOut.error"
  {...props}
/>;

export const SupplierMarkShipped = props => <ScanConfirmAction
  action="supplierMarkShipped"
  prompt="ui-rs.actions.markShipped.prompt"
  error="ui-rs.actions.markShipped.error"
  success="ui-rs.actions.markShipped.success"
  {...props}
/>;
export const PrintPullSlip = () => <Button buttonStyle="primary mega" fullWidth to="pullslip">Print pull slip</Button>;
export { default as SupplierCheckInToReshare } from './SupplierCheckInToReshare';
