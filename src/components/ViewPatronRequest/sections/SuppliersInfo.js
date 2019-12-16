import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import stateString from '../../../util/stateString';
import css from './SuppliersInfo.css';


class SuppliersInfo extends React.Component {
  static propTypes = {
    record: PropTypes.object,
    id: PropTypes.string,
  };

  render() {
    const { record } = this.props;

    return (
      ((record || {}).rota || []).sort((a, b) => a.rotaPosition - b.rotaPosition).map((supplier, i) => (
        <Card
          key={i}
          id={`${this.props.id}-card`}
          headerStart={`Supplier ${i + 1}`}
          headerEnd={<Link to={`/directory/entries?qindex=symbols.symbol&query=${supplier.directoryId.replace(/.*:/, '')}`}>View in directory</Link>}
          roundedBorder
          cardClass={css.supplierCard}
          headerClass={css.supplierCardHeader}
        >
          <Row>
            <Col xs={6}>
              <KeyValue
                label="Branch"
                value={supplier.directoryId}
              />
            </Col>
            <Col xs={6}>
              <KeyValue
                label="Status"
                value={stateString(supplier.state)}
              />
            </Col>
          </Row>
        </Card>
      ))
    );
  }
}

export default SuppliersInfo;
