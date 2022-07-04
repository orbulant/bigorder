import {
    Card,
    Text,
    Divider,
    Description,
    Collapse,
    Spacer,
    Grid,
    Link,
} from "@geist-ui/core";

const About = () => {
    return (
        <section>
            <Card shadow>
                <Card.Content>
                    <Text h2 my={0}>
                        BigOrder is free to use.
                    </Text>
                </Card.Content>
                <Divider h="1px" my={0} />
                <Card.Content>
                    <Text>
                        Big Order is online ordering system using QR Codes.
                    </Text>
                    <Spacer h={2} />
                    <Description
                        title="This system has two user roles"
                        content="Admin (Register) | Customers (Public)"
                    />
                    <Spacer h={2} />
                    <Collapse.Group>
                        <Collapse title="How to use:">
                            <Text>1.Admin creates a menu "ABC".</Text>
                            <Text>
                                2. Generate QR Code for menu "ABC" based on
                                table arrangement (generates a URL)
                            </Text>
                            <Text>
                                3. Customers can scan the QR code which brings
                                them to a URL to place orders.
                            </Text>
                            <Text>
                                4. From the admin side, they can view the orders
                                made to menu "ABC".
                            </Text>
                            <Text>
                                5. From the admin side, they can set orders
                                statuses to completed, paid, generate receipt,
                                view sales reports.
                            </Text>
                            <Text>
                                6. And of course, the admin can also edit the
                                menus they have made.
                            </Text>
                        </Collapse>
                    </Collapse.Group>
                </Card.Content>
            </Card>
            <Spacer h={1} />
            <Card>
                <Grid.Container gap={1.5}>
                    <Grid xs={12}>
                        <Card type="secondary">
                            <Text h2 style={{ color: "#FFF" }}>
                                Legal Notice
                            </Text>
                            <Text style={{ color: "#FFF" }}>
                                This app is for demonstration purposes as part
                                of my university's Final Year Project (FYP). Not
                                used for commercial purposes.
                            </Text>
                        </Card>
                    </Grid>
                    <Grid xs={6}>
                        <Card type="alert">
                            <Text h2 style={{ color: "#FFF" }}>
                                Creator
                            </Text>
                            <Text style={{ color: "#FFF" }}>
                                By: Tan Ka-Shing
                            </Text>
                            <Text style={{ color: "#0000EE" }}>
                                <Link href="https://www.tankashing.com" icon>
                                    Contact Me Here!
                                </Link>
                            </Text>
                        </Card>
                    </Grid>
                    <Grid xs={6}>
                        <Card type="warning">
                            <Text h2 style={{ color: "#FFF" }}>
                                Tech Used
                            </Text>
                            <Text style={{ color: "#FFF" }}>
                                Hosted on Heroku
                            </Text>
                            <Text
                                style={{ color: "#FFF", fontStyle: "italic" }}
                            >
                                This is a MERN Stack Web App
                            </Text>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Card>
        </section>
    );
};

export default About;
