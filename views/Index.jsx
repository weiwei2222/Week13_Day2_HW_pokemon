const React = require("react");
const myStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
};

class Index extends React.Component {
  render() {
    const { pokemon } = this.props;

    return (
      <div style={myStyle}>
        <h1>See All The Pokemon!</h1>

        {pokemon.map((pokemon, i) => {
          return (
            <ul>
              <a href={`/pokemon/${i}`}>
                <li>
                  Name:
                  <br />
                  {pokemon.name}
                  <br />
                  Img: <br />
                  <img src={pokemon.img} />
                </li>
              </a>
            </ul>
          );
        })}
      </div>
    );
  }
}

module.exports = Index;
