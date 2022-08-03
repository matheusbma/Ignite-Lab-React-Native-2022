import { useState } from 'react';
import { VStack } from 'native-base';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';


export function Register() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      Alert.alert('Registrar', 'Preencha todos os campos.')
    }

    setIsLoading(true)
    
    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      create_at: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação registrada com sucesso')
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
      return Alert.alert('Solicitação', 'Não foi possível registrar o pedido.')
    })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title='Solicitação'/>

      <Input
        placeholder='Número do Patrimônio'
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder='Descrição do problema'
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button 
      title='Cadastrar' 
      mt={5}
      onPress={handleNewOrderRegister}
      isLoading={isLoading}
      />

    </VStack>
  );
}