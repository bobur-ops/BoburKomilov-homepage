import {
  Container,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Box
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import { getWorkItem } from '../../constants/index'
import { useRouter } from 'next/dist/client/router'

const Work = () => {
  const router = useRouter()

  const workItem = getWorkItem(router.query.slug)

  if (!workItem) {
    return <></>
  }

  return (
    <Layout title="CMS-Blog">
      <Container>
        <Title>{workItem.title}</Title>
        <P>{workItem.description}</P>
        <List ml={4} my={4}>
          <ListItem display={'flex'} alignItems={'center'}>
            <Meta>Stack</Meta>
            <span>{workItem.stack}</span>
          </ListItem>
          <ListItem display={'flex'} alignItems={'center'}>
            <Meta>Website</Meta>
            <Link target="_blank" href={workItem.url}>
              {workItem.url}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        <SimpleGrid columns={2} gap={2}>
          {workItem.images.map((i, idx) => (
            <Box key={idx} maxHeight={'156px'}>
              <WorkImage src={i} alt="img" />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Work
