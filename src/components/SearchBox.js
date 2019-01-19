import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateSearchString, udpateSearchFocusIndex } from '../actions/updateSearchData';
import { fetchNodeDetails, fetchServiceDetails, resetDetails } from '../details/actions';
import { prevIcon, nextIcon, cancelIcon } from '../icons';

class SearchBox extends Component {

    selectPrevMatch = () => {
        const searchFocusIndex = this.props.searchFocusIndex;
        const searchFoundCount = this.props.searchFoundCount;

        this.props.udpateSearchFocusIndex(
            searchFocusIndex !== null ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount : searchFoundCount - 1
        );
    }

    selectNextMatch = () => {
        const searchFocusIndex = this.props.searchFocusIndex;
        const searchFoundCount = this.props.searchFoundCount;

        this.props.udpateSearchFocusIndex(
            searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0
        );
    }

    renderFoundSearchMatches() {
        if (this.props.searchFoundCount > 0) {
            return (
                <span className='found-search-matches'>
                    &nbsp;
                    {this.props.searchFoundCount > 0 ? this.props.searchFocusIndex + 1 : 0}
                    &nbsp;/&nbsp;
                    {this.props.searchFoundCount || 0}
                    &nbsp;
                </span>
            );
        } else return <></>;
    }

    render() {
        return (
            <form className="search-box" onSubmit={e => e.preventDefault()}>
                <input
                    name='search'
                    className='search-field'
                    placeholder='Search'
                    value={this.props.searchString}
                    onChange={e => {
                        this.props.updateSearchString(e.target.value);
                        if (e.target.value === '')
                            this.props.resetDetails()
                    }}
                />

                {this.renderFoundSearchMatches()}

                <div className="separator"></div>

                <i className={prevIcon} disabled={!this.props.searchFoundCount} onClick={this.selectPrevMatch}></i>
                <i className={nextIcon} disabled={!this.props.searchFoundCount} onClick={this.selectNextMatch}></i>
                <i
                    className={cancelIcon}
                    disabled={this.searchString === ''}
                    onClick={() => {
                        this.props.updateSearchString('');
                        this.props.resetDetails();
                    }}></i>
            </form>
        );
    }
}

const mapStateToProps = ({ searchData }) => {
    return {
        searchString: searchData.searchString,
        searchFocusIndex: searchData.searchFocusIndex,
        searchFoundCount: searchData.searchFoundCount
    }
};

export default connect(
    mapStateToProps,
    {
        updateSearchString,
        udpateSearchFocusIndex,
        fetchNodeDetails,
        fetchServiceDetails,
        resetDetails
    }
)(SearchBox);

export const doSearch = ({ node, searchQuery }) => {
    if (searchQuery !== '')
        return node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
    else return false;
}
