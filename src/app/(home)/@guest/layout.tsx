import TopNavbar from "@/components/layout/guest/top-navbar";
import { Grid, GridItem } from "@chakra-ui/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // two rows
    <Grid templateRows="60px 1fr">
      {/* top nav bar */}
      <GridItem
        as="header"
        display="flex"
        alignItems="center"
        bgColor="bg"
        shadow="xs"
        px="3"
      >
        <TopNavbar />
      </GridItem>

      {/* main content */}
      <GridItem as="main" px="3">{children}</GridItem>
    </Grid>
  );
}
