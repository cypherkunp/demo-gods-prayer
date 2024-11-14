import Prayer from "~/components/prayer";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Pray to the Demo Gods" },
    { name: "description", content: "Pray to the Demo Gods" },
  ];
};

export default function Index() {
  return <Prayer />;
}
