from ibm_watsonx_ai.foundation_models import Model

class IBMModel:
    def __init__(self, model_id, credentials, project_id, model_params=None) -> None:
        self.model = Model(
            model_id,
            credentials,
            params=model_params,
            project_id=project_id
        )
    def generate(self, prompt):
        response = self.model.generate_text(prompt)
        return response
    def chat(self, history, **kwargs):
        raise NotImplementedError
