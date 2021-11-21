import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Cryptoverse">
    <Container>
      <Title>
        Cryptoverse <Badge>2021-</Badge>
      </Title>
      <P>
        An application to monitor cryptocurrencies. Also can find latest CryptoNews
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://app-cryptoverse.netlify.app/">
            https://app-cryptoverse.netlify.app/<ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Windows/macOS/Linux/iOS/Android</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React, NodeJS, Next, </span>
        </ListItem>
      </List>

      <WorkImage src="/images/work/crypto_1.png" alt="Cryptovers" />
      <WorkImage src="/images/work/crypto_2.png" alt="Cryptovers" />
    </Container>
  </Layout>
)

export default Work
