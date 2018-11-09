import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap'

const active_link_style = { backgroundColor: "#f22", padding: "2px", borderRadius: "4px" }

const Menu = () => (
  <div style={{ backgroundColor: "#fbb", padding: "5px" }}>
        <NavLink activeStyle={active_link_style} exact to="/">anecdotes</NavLink>&nbsp;
        <NavLink activeStyle={active_link_style} to="/create">create new</NavLink>&nbsp;
        <NavLink activeStyle={active_link_style} to="/about">about</NavLink>&nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
    <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
)

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <Grid>
            <Row className="show-grid">
                <Col md={8} xs={12}>
                    <p>According to Wikipedia:</p>

                    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
                      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
                      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
                      An anecdote is "a story with a point."</em>

                    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
                </Col>
                <Col md={4} xs={12}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Ada_Lovelace_in_1852.jpg" alt="Ada Lovelace" style={{ width: "80%" }} />
                </Col>
            </Row>
        </Grid>
    </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                content
              </Col>
              <Col sm={10}>
                <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                author
              </Col>
              <Col sm={10}>
                <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                url for more info
              </Col>
              <Col sm={10}>
                <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                  <Button type="submit">create</Button>
              </Col>
            </FormGroup>
        </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `a new anecdote ${anecdote.content} created!` })
    setTimeout(() => this.setState({ notification: undefined }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const notif_style = {
        border: "1px solid black",
        boxShadow: "5px 5px",
        padding: "3px",
        backgroundColor: "#ddd",
        margin: "5px"
    }
    const notif = this.state.notification ? (<Alert style={notif_style}>{this.state.notification}</Alert>) : undefined
    return (
        <Router>
          <div className="container">
            <h1>Software anecdotes</h1>
              <Menu />
              {notif}
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/about" render={() => <About />} />
              <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/>} />
              <Route exact path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            <Footer />
          </div>
        </Router>
    );
  }
}

export default App;
