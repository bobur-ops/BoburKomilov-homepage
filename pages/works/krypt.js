import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  SimpleGrid
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'

const Work = () => (
  <Layout title="Shareme">
    <Container>
      <Title>
        Kryptomastery<Badge>2021-</Badge>
      </Title>
      <P>A WEB 3.0 Blockchain application with real transactions on ETH.</P>
      <P>This is not commercial web-site</P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React, Soldity, TailwindCSS </span>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://kryptomastery.vercel.app/">
            https://kryptomastery.vercel.app/
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </List>

      <SimpleGrid columns={2} gap={2}>
        <WorkImage src="/images/work/krypt_1.png" alt="krpyt" />
        <WorkImage src="/images/work/krypt_2.png" alt="krypt" />
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Work
