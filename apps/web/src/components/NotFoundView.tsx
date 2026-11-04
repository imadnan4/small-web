import { isValidAddress } from "@/lib/address";

type Props = {
  address: string;
};

export default function NotFoundView({ address }: Props) {
  return (
    <div className="page">
      <p className="kicker">Nowhere</p>
      <h1>No page at this address.</h1>
      <p className="lead">
        <code>{address}</code> is not published on the small web.
      </p>
      <p className="muted">
        {isValidAddress(address)
          ? "The address is well formed. Nobody has written the page yet."
          : "That does not look like a small web address. They end in .zz."}
      </p>
    </div>
  );
}
