import { Card, Text, Divider } from "@geist-ui/core";

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
                        Created while having covid...
                    </Text>
                </Card.Content>
            </Card>
        </section>
    );
};

export default About;
