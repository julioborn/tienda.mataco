import React, { useState } from 'react';
import {
  Button,
  Grid,
  Stack,
  Text,
  Link,
  Flex,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/react';
import api from 'tienda.mataco/product/api';
import { Product } from 'tienda.mataco/product/types';
import { GetStaticProps } from 'next';
import swal from 'sweetalert';

interface Props {
  products: Product[];
}

const Home: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);
  const text = React.useMemo(
    () =>
      cart
        .reduce((message, product) => message.concat(`* ${product.producto} ${product.talle ? '- Talle: ' + product.talle : ''}: $${product.precio}\n`), ``)
        .concat(`- Total: $${cart.reduce((total, product) => total + product.precio, 0)}`),
    [cart]
  );
  const isIndumentaria = (product: Product) => product.categoria === 'Indumentaria';
  const handleTalleSelection = (product: Product, talle: string) => {
    const updatedProduct = { ...product, talle };
    setCart((cart) => cart.concat(updatedProduct));
  };
  const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false);
  const openSizeGuide = () => {
    setIsSizeGuideOpen(true);
  };
  const closeSizeGuide = () => {
    setIsSizeGuideOpen(false);
  };
  const [expandedImage, setExpandedImage] = useState('');
  const handleImageClick = (src: string) => {
    setExpandedImage(src);
  };
  const closeExpandedImage = () => {
    setExpandedImage('');
  };

  return (
    <Stack spacing={6}>
      {/* Botón para abrir la guía de talles */}
      <Flex justifyContent="center">
        <Button backgroundColor="blue.700" color="white" onClick={openSizeGuide}>Guía de talles</Button>
      </Flex>

      {/* Modal de la guía de talles */}
      <Modal isOpen={isSizeGuideOpen} onClose={closeSizeGuide}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontSize: 30, fontWeight: 'bolder' }}>Guía de Talles en cm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Contenido de la guía de talles */}
            <div>
              <p style={{ fontSize: "20px", fontWeight: 'bold', textDecoration: 'underline' }}>Talles de Buzos:</p>
              <img src="/tallesbuzosfinal.png" style={{ borderRadius: 5 }} />
            </div>
            <div style={{ marginTop: 15 }}>
              <p style={{ fontSize: "20px", fontWeight: 'bold', textDecoration: 'underline' }}>Talles Remeras Hombres:</p>
              <img src="/camisetashombretallesfinal.png" style={{ borderRadius: 5 }} />
            </div>
            <div style={{ marginTop: 15 }}>
              <p style={{ fontSize: "20px", fontWeight: 'bold', textDecoration: 'underline' }}>Talles Remeras Mujeres:</p>
              <img src="/camisetasmujerestallesfinal.png" style={{ borderRadius: 5 }} />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(130px, 1fr))">
        {products.map((product) => (
          <Stack borderRadius="md" padding={4} backgroundColor="gray.100" key={product.id}>
            <Image
              maxHeight="auto"
              objectFit="cover"
              borderRadius="4"
              src={product.imagen}
              onClick={() => handleImageClick(product.imagen)}
              cursor="pointer"
            />
            <Text sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>{product.producto}</Text>
            <Text>$ {product.precio}</Text>
            {isIndumentaria(product) ? (
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg="blue.700" color="white" borderRadius="md">
                      <Text>Talle</Text>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel sx={{ dislay: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Aquí puedes agregar los talles */}
                    <Button size="xs" mr={2} mb={1} backgroundColor="blue.700" color="white" onClick={() => { handleTalleSelection(product, 'S'); swal("Producto agregado al carrito", "Sigue viendo los productos", "success") }}>
                      S
                    </Button>
                    <Button size="xs" mr={2} mb={1} backgroundColor="blue.700" color="white" onClick={() => { handleTalleSelection(product, 'M'); swal("Producto agregado al carrito", "Sigue viendo los productos", "success") }}>
                      M
                    </Button>
                    <Button size="xs" mr={2} mb={1} backgroundColor="blue.700" color="white" onClick={() => { handleTalleSelection(product, 'L'); swal("Producto agregado al carrito", "Sigue viendo los productos", "success") }}>
                      L
                    </Button>
                    <Button size="xs" mr={2} mb={1} backgroundColor="blue.700" color="white" onClick={() => { handleTalleSelection(product, '2XL'); swal("Producto agregado al carrito", "Sigue viendo los productos", "success") }}>
                      2XL
                    </Button>
                    <Button size="xs" mr={2} mb={1} backgroundColor="blue.700" color="white" onClick={() => { handleTalleSelection(product, '3XL'); swal("Producto agregado al carrito", "Sigue viendo los productos", "success") }}>
                      3XL
                    </Button>
                    <Button size="xs" mr={2} mb={1} backgroundColor="blue.700" color="white" onClick={() => { handleTalleSelection(product, '4XL'); swal("Producto agregado al carrito", "Sigue viendo los productos", "success") }}>
                      4XL
                    </Button>
                    <Button size="xs" mr={2} mb={1} backgroundColor="blue.700" color="white" onClick={() => { handleTalleSelection(product, '5XL'); swal("Producto agregado al carrito", "Sigue viendo los productos", "success") }}>
                      5XL
                    </Button>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ) : (
              <Button colorScheme="primary" backgroundColor="blue.700" color="white" onClick={() => { setCart((cart) => cart.concat(product)); swal("Producto agregado al carrito", "Sigue viendo los productos", "success") }}>
                Agregar
              </Button>
            )}
          </Stack>
        ))}
      </Grid>
      <Modal isOpen={!!expandedImage} onClose={closeExpandedImage}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={expandedImage} borderRadius="md" mb="9"/>
          </ModalBody>
        </ModalContent>
      </Modal>
      {Boolean(cart.length) && (
        <Flex position="sticky" bottom={16} justifyContent="center" alignItems="center">
          {/* @ts-ignore */}
          <Button
            colorScheme="green"
            as={Link}
            isExternal
            href={`https://wa.me/3483434068?text=${encodeURIComponent(text)}`}
          >
            Completar pedido ({cart.length} productos)
          </Button>
        </Flex>
      )}
      {Boolean(cart.length) && (
        <Flex position="sticky" bottom={5} justifyContent="center" alignItems="center">
          <Button width="268px" colorScheme="red" backgroundColor="red" color="white" onClick={() => setCart([])}>
            Eliminar pedido
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {
    revalidate: 10,
    props: {
      products,
    },
  };
};

export default Home;
