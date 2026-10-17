import { site } from "@/lib/site";

export function ArtistCall() {
  return (
    <div className="grid gap-2 rounded-md bg-gold-tint p-5">
      <h3 className="font-display text-xl">
        Are you a Brisbane or Melbourne artist?
      </h3>
      <p>
        We&apos;d love to put your art in our parcels. Email{" "}
        <span className="font-bold select-all">{site.email}</span> with a link
        to your work.
      </p>
    </div>
  );
}
