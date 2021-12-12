import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Cryptoverse">
    <Container>
      <Title>
        Realtor Estate <Badge>2021-</Badge>
      </Title>
      <P>
        An application with information about Real Estate from all over the
        world.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://realtor-estate.vercel.app/">
            https://realtor-estate.vercel.app/
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React, NextJS, Chakra-ui </span>
        </ListItem>
      </List>

      <WorkImage src="/images/work/estate-1.png" alt="Real Estate" />
      <WorkImage src="/images/work/estate-2.png" alt="Real Estate" />
    </Container>
  </Layout>
)

export default Work
