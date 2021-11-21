import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Cool Slider">
    <Container>
      <Title>
        Cool Slider <Badge>2020-</Badge>
      </Title>
      <P>
        Responsive Slider with a lot of interesting animations
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://bobur-ops.github.io/Slider.github.io/">
            https://bobur-ops.github.io/Slider.github.io/<ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Pure HTML, CSS, JavaScript, GSAP, SwiperAPI</span>
        </ListItem>
      </List>

      <WorkImage src="/images/work/slider.png" alt="Slider" />
    </Container>
  </Layout>
)

export default Work
