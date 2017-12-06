import React from "react";
import GamesList from "./GamesList.js";
import FriendButton from "./FriendButton.js";
import GamesCard from "./GamesCard.js";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      owned: [],
      wishlist: [],
      imgClass: "ui centered segment medium image"
    };
  }

  getUserGameIds() {
    return this.props.games.map(game => game.game.id);
  }
  getGames(category) {
    return this.props.user.user_games.filter(
      game =>
        game.info[category] === true &&
        this.getUserGameIds().includes(game.game.id)
    );
  }

  onImgEnter() {
    this.setState({ imgClass: "ui centered secondary segment medium image" });
  }

  onImgLeave() {
    this.setState({ imgClass: "ui centered segment medium image" });
  }

  render() {
    if (!this.props.user.user_info) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <div>
          <h1 className="ui center aligned header ">
            {this.props.user.user_info.first_name}
            {this.props.user.user_info.last_name}
          </h1>
        </div>
        <br />

        <img
          onMouseEnter={this.onImgEnter.bind(this)}
          onMouseLeave={this.onImgLeave.bind(this)}
          className={this.state.imgClass}
          src={
            this.props.user.user_info.profile_image_url
              ? this.props.user.user_info.profile_image_url
              : "https://www.menon.no/wp-content/uploads/person-placeholder.jpg"
          }
        />

        <br />
        <div className="ui segment" id="profileGreyed">
          <h4 className="ui center aligned header">Friends</h4>
          {this.props.user.friends.map(friend => (
            <FriendButton
              key={friend.id}
              friend={friend}
              user={this.props.user}
            />
          ))}
        </div>
        <div className="ui segment" id="profileGreyed">
          <div className="profileGreyed">
            <h4 className="ui center aligned header">Owned</h4>

            <GamesList
              onAddGame={this.props.onAddGame}
              onRemoveGame={this.props.onRemoveGame}
              games={this.getGames("owned")}
              user={this.props.user}
              attributePost={this.props.attributePost}
            />

          </div>
        </div>
        <div className="ui segment" id="profileGrey">
          <h4 className="ui center aligned header">Wish List</h4>
          <GamesList
            onAddGame={this.props.onAddGame}
            onRemoveGame={this.props.onRemoveGame}
            games={this.getGames("wishlist")}
            user={this.props.user}
            attributePost={this.props.attributePost}
          />
        </div>
        <div className="ui segment" id="profileGrey">
          <h4 className="ui center aligned header">Favorited</h4>
          <GamesList
            onAddGame={this.props.onAddGame}
            onRemoveGame={this.props.onRemoveGame}
            games={this.getGames("favorite")}
            user={this.props.user}
            attributePost={this.props.attributePost}
          />
        </div>
      </div>
    );
  }
}

export default UserProfile;
