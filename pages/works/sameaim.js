import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Same Aim">
    <Container>
      <Title>
        SameAim <Badge>2021-</Badge>
      </Title>
      <P>
        A social media app for creating and joining clubs with various theme
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://sameaim.vercel.app/">
            https://sameaim.vercel.app/
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Nextjs, Prisma, TRPC, Chakra ui</span>
        </ListItem>
      </List>

      <WorkImage src="/images/work/sameaim_1.png" alt="Rest" />
      <WorkImage src="/images/work/sameaim_2.png" alt="Rest" />
    </Container>
  </Layout>
)

export default Work
