import React from 'react';
import './style.css';
import talksJSON from './talks.json';

export default class Page extends React.Component {

  constructor() {
    super();
    this.state = {
      tabSelected: 0,
      tabHeaders: ['Home', 'Resume', 'Talks', 'Contact']
    }
  }

  tabClickHandler = (index) => {
    this.setState({ tabSelected: index });
  }

  render() {
    return (
      <div className='siteWrapper'>
        <TopBar />
        <MenuBar {...this.state} tabClickHandler={this.tabClickHandler} />
        <ContentArea tab={this.state.tabHeaders[this.state.tabSelected]} />
      </div>
    );
  }

}


const TopBar = () => (
  <div className='topBar'>
      <h1> Sachin Chopra </h1>
      <h2> Software Engineer @
        <a href='https://www.myntra.com'  target='_rel'>
          <img src='https://pbs.twimg.com/profile_images/707599074791284739/E5Aea4nl_400x400.jpg' className='mLogo'/> 
        </a>
      </h2>
  </div>
)

const MenuBar = (props) => (
  <div className='menuBar'>
  {
    props.tabHeaders.map((tab, index) => (
      <button 
        onClick = {() => props.tabClickHandler(index)}
        className={'menuButtons' + (index === props.tabSelected ? ' tabSelected' : '')}>
        {tab} 
      </button>
    ))
  }
  </div>
)


const ContentArea = (props) => {
  let content;
  if (props.tab === 'Home') {
    content = <Home />
  } else if (props.tab === 'Resume') {
    content = <Resume />
  } else if (props.tab === 'Talks') {
    content = <Talks />
  } else if (props.tab === 'Contact') {
    content = <Contact />
  }
  return (
    <div className='contentArea'>
      {content}
    </div>
  )
}

const Home = () => (
  <div>
    Home
  </div>
)

const Resume = () => (
  <div>
    Resume
  </div>
)

const Talks = () => (
  <div>
    {
      talksJSON.map((thisTalk) => (
        <RenderTalk talk={thisTalk}/>
      ))
    }
  </div>
)

const RenderTalk = (props) => (
  <div>
    <h2> {props.talk.header} </h2>
    <ul>
    {
      props.talk.links.map((thisLink) => (
        <li> 
          <iframe 
            frameBorder="0" width="480" height="299" allowFullScreen="true"
            src={thisLink}> 
              {thisLink} 
          </iframe>
        </li>
      ))
    }
    </ul>
  </div>
)

const Contact = () => (
  <div>
    Contact
  </div>
)