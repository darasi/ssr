import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import loads from './loads';
import config from './config';
import selfUser from './selfUser';
import {post} from './post';
import {userPosts} from './userPosts';
import {photo} from './photo';
import {creation} from './creation';
import {users} from './users';
import { reducer as formReducer } from 'redux-form';
//逻辑复用
const createFilteredReducer=(reducerFunction,reducerPredicate)=>{
	return (state,action)=>{
		const isInitializationCall=state==undefined;
		const shouldRunWrappedReducer=reducerPredicate(action) || isInitializationCall;
		return shouldRunWrappedReducer ? reducerFunction(state,action):state;
	}
}

export default combineReducers({
	userPosts,//所有用户的帖子
	loads,//所有加载
	users,//所有用户
	selfUser,//用户
	creation,//创造
	form:formReducer,
	config,
	photo,//照片详情展示
	router:routerReducer,
	homePosts:createFilteredReducer(post,action=>action.name=='homePosts'),
})