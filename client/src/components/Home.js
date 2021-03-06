import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UpcomingFixtures from './UpcomingFixtures'
import RecentResults from './RecentResults'
import Search from './Search'

const ScoreBox = styled.div`
    display: flex;
    flex-direction: row;
    border-style: dashed;
    border-width: 8px;
    background-color: white;
    overflow-y: scroll;
    height: 610px;
`
const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

class Home extends Component {
    constructor(){
        super();
        this.state = {
          fixtures: []
        }
      }


    componentWillMount (){
        axios.get('https://api.football-data.org/v1/fixtures', {
            timeout: 5000,
            headers: {'X-Auth-Token': 'f09f3d45f18c4cb2bb456144f36fa451'}            
        })
            .then((res) => {
                this.setState(res.data);
                });
        }
    

    render() {
        return (
            <div>
                <HomePage>
                    <Search searchByTeam={this.props.searchByTeam} />
                    <ScoreBox>
                        <UpcomingFixtures fixtures={this.state.fixtures}/>
                        <RecentResults fixtures={this.state.fixtures} />
                    </ScoreBox>
                </HomePage>
            </div>
        )
    }
}

export default Home;