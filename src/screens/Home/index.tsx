import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  // ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]); // estou criando estado para atualiuzar os participantes e para iniciar vazio.
  const [participantName, setParticipantName] = useState(""); // estou criando o estado para adicionar e limpar o nome do input

  function handleParticipantAdd() {
    // adicionr na lista e se caso adicionar com mesmo nome vai impedir
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Este participante já existe",
        "Já existe um participante em sua lista com esse nome"
      );
    }

    setParticipants((prevState) => [...prevState, participantName]); // aqui adiciona alguén na lista
    setParticipantName("");
  }
  function handleParticipantRemove(name: string) {
    // remover da lista
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          ), // aqui está removendo a alguém lista e surje um alert para perguntar se quer realmente excluir ou não
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Meu Aniversário</Text>
      <Text style={styles.eventDate}>28 de Junho de 2002</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName} // aqui transfere o texto para o estado deixando vazio
          value={participantName}
        />
        {/* Aqui é um botão de toque e a tag Text para exibir oque vai dentro do botão */}
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Utilizando ScrollView
       <ScrollView showsVerticalScrollIndicator={false}>
        {participants.map((participant) => (
          <Participant
            key={participant} // nome da chave key para identificar essa função
            name={participant}
            onRemove={() => handleParticipantRemove("Gabriel")}
          />
        ))}
      </ScrollView> */}

      {/* Utilizando FLatList  para criar as listas */}
      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          // componente Participant que vem da pasta de components sendo reaproveitado
          <Participant
            key={item} // nome da chave key para identificar essa função
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione novos participantes em sua
            lista de presença.
          </Text>
          // quando não tiver ninguém na lista, ira exibir esta mensagem.
        )}
      />
      {/* showsVerticalScrollIndicator={false} serve para desativar a barra de rolagem */}
    </View>
  );
}
