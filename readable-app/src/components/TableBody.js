import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Table from 'react-bootstrap/lib/Table';
import Badge from 'react-bootstrap/lib/Badge';
import ChevronUp from 'react-icons/lib/fa/chevron-up';
import ChevronDown from 'react-icons/lib/fa/chevron-down';


class TableBody extends React.Component {

  
  render() {
    const Timestamp = require('react-timestamp');
    const divStyle = {
      verticalAlign: 'middle'
    };

    const { showingPosts } = this.props

    return (    
        <Grid>
          <Row>
            <Col md={12}>
              <Table striped bordered condensed hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>SCORE <ButtonToolbar>
                                <Button bsSize="xsmall"><ChevronDown /></Button>
                                <Button bsSize="xsmall"><ChevronUp /></Button>
                              </ButtonToolbar>
                    </th>
                    <th>POSTS</th>
                  </tr>
                </thead>
                <tbody>
                  {showingPosts.map((post, index)=>(
                    <tr key={post.id}>
                      <td style={divStyle} className="text-center"><h3>{index + 1}</h3></td>
                      <td style={divStyle} className="text-center">
                        <Button bsSize="xsmall"><ChevronUp /></Button> <Badge>{post.voteScore}</Badge> <Button bsSize="xsmall"><ChevronDown /></Button>
                       </td>
                      <td>
                        <a href="#">
                          <h4 class="list-group-item-heading">{post.title}</h4>
                        </a>
                        <p><small>Posted By {post.author}, <Timestamp time={post.timestamp} utc={false} precision={3} format='date' /> </small></p>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default TableBody