import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Logo from '../assets/logo_secondary.svg'
import { SignOut } from 'phosphor-react-native'
import { ChatTeardropText} from 'phosphor-react-native'

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Order, OrderProps } from '../components/Order';
import { Loading } from '../components/Loading'
import { dateFormat } from '../utils/firestoreDateFormats'

export function Home() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);

  function handleNewOrder() {
    navigation.navigate('new')
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId })
  };

  function handleLogout() {
    auth()
    .signOut()
    .catch(error => {
      console.log(error)
      return Alert.alert('Sair', 'Não foi possível sair.')
    })
  };

  useEffect(() => {
    setIsLoading(true)

    const subscriber = firestore()
    .collection('orders')
    .where('status', '==', statusSelected)
    .onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => {
        const { patrimony, description, status, create_at } = doc.data();

        return {
          id: doc.id,
          patrimony,
          description,
          status,
          when: dateFormat(create_at),
        }
      });

      setOrders(data)
      setIsLoading(false)

    });

    return subscriber

  }, [statusSelected]);


  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        < Logo />

        < IconButton 
          icon={<SignOut size={26} color={colors.gray[300]}/>}
          onPress={handleLogout}
        />

      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type='open'
            title='em andamento'
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />

          <Filter
            type='closed'
            title='finalizados'
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        {
        isLoading ? < Loading /> :
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => < Order data={item} onPress={ () => handleOpenDetails(item.id)}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100}}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40}/>
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {'\n'}
                solicitações {statusSelected === 'open' ? 'em aberto' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />
        }

        <Button title='Nova solicitação' onPress={handleNewOrder}/>

      </VStack>
    </VStack>
  );
}