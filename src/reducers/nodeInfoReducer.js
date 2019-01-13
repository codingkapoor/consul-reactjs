import { FETCH_NODE_INFO } from '../actions/actionType';

const nodeInfoReducer = (nodeInfo = {}, { type, payload }) => {
    if (type === FETCH_NODE_INFO)
        return payload;
    
    return nodeInfo;
}

export default nodeInfoReducer;
