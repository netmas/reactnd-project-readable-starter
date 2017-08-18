import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import Badge from 'react-bootstrap/lib/Badge';
import ChevronUp from 'react-icons/lib/fa/chevron-up';
import ChevronDown from 'react-icons/lib/fa/chevron-down';

class Body extends React.Component {

  render() {

    const divStyle = {
      verticalAlign: 'middle'
    };

    return (    
        <Grid>
          <Row>
            <Col md={12}>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td style={divStyle} className="text-center"><h3>1</h3></td>
                    <td style={divStyle} className="text-center">
                      <ChevronUp /> <ChevronDown /> <Badge>42</Badge>
                     </td>
                    <td>
                      <a href="#">
                        <h4 class="list-group-item-heading">Titulo de la noticia</h4>
                      </a>
                      <p><small>Subtitulo va aqui</small> <Badge>42</Badge></p>
                      
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
    );
  }
}


export default Body