import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Cryptoverse">
    <Container>
      <Title>
        Video Chat <Badge>2021-</Badge>
      </Title>
      <P>
        A Video Chat Application.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://video-chat-v.netlify.app/">
            https://video-chat-v.netlify.app/<ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React, NodeJS, SocketIO </span>
        </ListItem>
      </List>

      <WorkImage src="/images/work/video-chat.png" alt="Cryptovers" />
    </Container>
  </Layout>
)

export default Work
