import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';


class Page404 extends React.Component {

	render() {
		return (
			<Grid>
	          <Row>
	            <Col md={12}>
	            	<PageHeader>Page Not Found <small>Error 404</small></PageHeader>
	            </Col>
	          </Row>
	        </Grid>
			);
	}
}

export default Page404