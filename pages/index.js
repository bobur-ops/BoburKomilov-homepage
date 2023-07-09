import NextLink from 'next/link'
import {
  Button,
  Container,
  Box,
  Heading,
  Image,
  List,
  ListItem,
  Link,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import { IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import { AiFillLinkedin } from 'react-icons/ai'
import { GrDocumentPdf } from 'react-icons/gr'

const Page = () => {
  const handleDownload = () => {
    const downloadUrl = '/cv.pdf'
    window.open(downloadUrl, '_blank')
  }

  return (
    <Layout>
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          p={3}
          mb={6}
          align="center"
        >
          Hello, I&apos;m a front-end developer based in Uzbekistan!
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Bobur Komilov
            </Heading>
            <p>Front End Developer</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            align="center"
          >
            <Image
              border-color="whiteAplha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/bobur.jpg"
              alt="Profile Image"
            />
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            A highly skilled and motivated front-end developer with 2 years of
            experience in creating visually appealing and user-friendly
            websites. Proficient in Nuxt/Vue and Next/React, with a strong
            understanding of responsive design principles and best practices.
          </Paragraph>
          <Box align="center" my={4}>
            <NextLink href="/works">
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                My portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>2021</BioYear>
            Axie Labs
          </BioSection>
          <BioSection>
            <BioYear>2022</BioYear>
            ODMSoft
          </BioSection>
          <BioSection>
            <BioYear>2022</BioYear>
            MasterPlast
          </BioSection>
        </Section>
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I ♥
          </Heading>
          <Paragraph>Football, Music, Machine Learning</Paragraph>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            On the web
          </Heading>
          <List>
            <ListItem>
              <Link href="https://github.com/bobur-ops" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoGithub} />}
                >
                  @bobur-ops
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="https://www.instagram.com/http.bobur" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoInstagram} />}
                >
                  @http.bobur
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.linkedin.com/in/boburkomiljonov"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={AiFillLinkedin} />}
                >
                  LinkedIn
                </Button>
              </Link>
            </ListItem>
          </List>
        </Section>
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            CV / Resume
          </Heading>
          <List>
            <Button
              onClick={handleDownload}
              rightIcon={<GrDocumentPdf />}
              colorScheme="teal"
            >
              Download CV
            </Button>
          </List>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page
