import React from 'react';
import {Route,Redirect,withRouter,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../Components/PageLoading';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import PhotoSwipe from './PhotoSwipe';
import Page from '../Components/Page';
import AutoHidden from '../Components/AutoHidden';
import {push} from 'react-router-redux';

const LoadableTab=Loadable({
  loader: () => import(/* webpackChunkName: 'Tab' */ './Tab'),
  loading:PageLoading
});
const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './User/User'),
  loading:PageLoading
});
const LoadableLogin = Loadable({
  loader: () => import(/* webpackChunkName: 'Login' */ './Login'),
  loading:PageLoading
});
const LoadableJoin = Loadable({
  loader: () => import(/* webpackChunkName: 'Join' */ './Join'),
  loading:PageLoading
});
const LoadableSelfSite = Loadable({
  loader: () => import(/* webpackChunkName: 'SelfSite' */ './SelfSite'),
  loading:PageLoading
});

class App extends React.Component{
	componentWillMount(){
		//未登录
		if(!this.props.selfUser.name){
			this.props.pushAct('/login')
		}
	}
	render(){
		return(
			<Page>
				<Switch>
					<Route path="/login"  component={LoadableLogin}/>
					<Route path="/join"  component={LoadableJoin}/>
					<Route path="/self_site"  component={LoadableSelfSite}/>
					<Route exact path="/user/:name" component={LoadableUser}/>
					<Route path="/"  component={LoadableTab}/>
				</Switch>
				<AutoHidden />
				<PhotoSwipe />
			</Page>
			)
	}
};
const mapStateToProps=(state)=>({
	selfUser:state.selfUser
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
	pushAct:push
},dispatch)
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));