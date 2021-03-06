import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Parser } from 'html-to-react';
import { injectIntl } from 'react-intl';
import Handlebars from 'handlebars';
import slipTemplate from './design/slip.handlebars';
import wrapperTemplate from './design/singleslipwrapper.handlebars';
import { establishStylesHook, recordToPullSlipData } from './util';

const PullSlip = (props) => {
  useEffect(establishStylesHook, []);
  Handlebars.registerPartial('slip', slipTemplate);
  const s = wrapperTemplate(recordToPullSlipData(props.intl, props.record));
  return (new Parser()).parse(s);
};

PullSlip.propTypes = {
  record: PropTypes.object.isRequired,
};

export default injectIntl(PullSlip);
