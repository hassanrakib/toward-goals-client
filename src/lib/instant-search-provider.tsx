import { envConfig } from "@/config/envConfig";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch";

const searchClient = algoliasearch(
  envConfig.algolia_app_id!,
  envConfig.algolia_search_api_key!
);

const InstantSearchProvider = ({
  indexName,
  children,
}: {
  indexName: string;
  children: React.ReactNode;
}) => {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      {children}
    </InstantSearch>
  );
};

export default InstantSearchProvider;
