import { Provider } from "../interfaces";
import connection from "../utils/connection";
import selectors from "../utils/selectors";

const providers:Provider[] = [
    { name: "Cal", url: connection.cal, selector: selectors[0] },
    // { name: "Max", url: connection.max, selector: selectors[1] },
    // { name: "Hvr", url: connection.hvr, selector: selectors[2] },
    // { name: "PaisPlus", url: connection.paisplus, selector: selectors[3] },
  ];

  export default providers;