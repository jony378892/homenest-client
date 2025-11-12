import useAxios from "../hooks/useAxios";

const propertiesPromise = useAxios.get("/properties").then((data) => {
  return data.data;
});

export default function Properties() {
  return <div></div>;
}
